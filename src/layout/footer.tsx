import { Link, useLocation } from 'react-router-dom';

const destinations = ['Oslo', 'Bergen', 'Stockholm', 'Copenhagen', 'London', 'Paris', 'Barcelona', 'Rome'];

const company = ['About', 'Careers', 'Press', 'Help centre'];

export function Footer() {
    const location = useLocation();
    const hideFooterPaths = ['/login', '/register'];

    if (hideFooterPaths.includes(location.pathname)) {
        return null;
    }

    return (
        <footer className='mt-12 bg-mist'>
            <div className='container-page py-12'>
                <div className='grid gap-10 md:grid-cols-[1.5fr_2fr_1fr]'>
                    <div>
                        <Link to='/' className='font-logo text-2xl font-extrabold tracking-tight text-ink'>
                            holidaze<span className='text-accent'>.</span>
                        </Link>
                        <p className='mt-3 max-w-xs text-base text-graphite'>
                            Discover and book unique homes and vacation rentals worldwide.
                        </p>
                    </div>

                    <div>
                        <h2 className='section-heading'>Popular destinations</h2>
                        <ul className='mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4'>
                            {destinations.map(city => (
                                <li key={city}>
                                    <Link to={`/explore?search=${city.toLowerCase()}`} className='link text-sm'>
                                        {city}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className='section-heading'>Holidaze</h2>
                        <ul className='mt-4 flex flex-col gap-2'>
                            {company.map(item => (
                                <li key={item} className='text-sm text-graphite'>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='mt-12 border-t border-divider pt-6 text-sm text-graphite'>
                    © {new Date().getFullYear()} Holidaze. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
