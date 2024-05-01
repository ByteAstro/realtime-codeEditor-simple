import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const addPropsToReactElement = (element, props) => {
    if (React.isValidElement(element)) {
        return React.cloneElement(element, props);
    }

    return element;
}

const addPropsToChildren = (children, props) => {
    if (!Array.isArray(children)) {
        return addPropsToReactElement(children, props);
    }

    return children.map(childElement => addPropsToReactElement(childElement, props));
}

const SocketWrapper = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const socket = io(import.meta.env.VITE_BACKEND_ROOT_ENDPOINT);

    useEffect(() => {
        const kickStrangerOut = () => {
            navigate('/', { replace: true });
            toast.error('Not allowed');
        }

        location.state?.username ?
            socket.emit('join', {
                roomId,
                username: location.state?.username,
            }) : kickStrangerOut();
        console.log('Socket working');
    }, [location.state, socket, roomId, navigate])

    return (<>
        {location.state?.username ? (
            <>{addPropsToChildren(children, { socket })}</>
        ) : (
            <div>Not allowed. Please use the Room Select to Join a room</div>
        )}
    </>
    )
}

export default SocketWrapper