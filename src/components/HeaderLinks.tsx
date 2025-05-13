import { useEffect, useState } from 'react';
import { isLoggedIn, isVenueManager } from '../utils/authHelpers.ts';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

type CreateVenueLinkProps = {
    onClick?: () => void;
};

export function CreateVenueLink({ onClick }: CreateVenueLinkProps) {
    const [canCreate, setCanCreate] = useState(false);

    useEffect(() => {
        isVenueManager().then(setCanCreate);
    }, []);

    return canCreate ? (
        <Link to='/create' onClick={onClick}>
            Create venue
        </Link>
    ) : (
        <span
            className='cursor-pointer text-gray-400'
            onClick={() => {
                toast.error('You need to be a venue manager');
                onClick?.();
            }}
        >
      Create venue
    </span>
    );
}

type ProfileLinkProps = {
    onClick?: () => void;
}

export function ProfileLink({ onClick }: ProfileLinkProps) {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        setLogged(isLoggedIn());
    }, []);

    return logged ? (
        <Link to='/profile' onClick={onClick}>
            Profile
        </Link>
    ) : (
        <span
            className='cursor-pointer text-gray-400'
            onClick={() => {
                toast.error('You need to be logged in');
                onClick?.();
            }}
        >
      Profile
    </span>
    );
}