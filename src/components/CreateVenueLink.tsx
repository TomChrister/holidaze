import { useEffect, useState } from 'react';
import { isVenueManager } from '../utils/authHelpers.ts';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export function CreateVenueLink() {
    const [canCreate, setCanCreate] = useState(false);

    useEffect(() => {
        isVenueManager().then(setCanCreate);
    }, []);

    return canCreate ? (
        <Link to='/create'>Create venue</Link>
    ) : (
        <span
            className='text-gray-400 cursor-pointer'
            onClick={() => toast.error('You need to be a venue manager')}
        >
            Create venue
        </span>
    );
}