import { isLoggedIn, isVenueManager } from '../utils/authHelpers.ts';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

type CreateVenueLinkProps = {
    onClick?: () => void;
};

export function CreateVenueLink({ onClick }: CreateVenueLinkProps) {
    return isVenueManager() ? (
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
    return isLoggedIn() ? (
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