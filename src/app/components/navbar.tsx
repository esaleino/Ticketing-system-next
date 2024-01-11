'use client';
import { ClientSession, SessionData } from '@/lib/session';
import { Navbar, Flowbite, Dropdown } from 'flowbite-react';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Spinner from '@/components/loadingSpinner';
import { Navbarstyles } from '@/styles';

const DarkThemeToggle = dynamic(
	() => import('flowbite-react').then((mod) => mod.DarkThemeToggle),
	{
		ssr: false,
		loading: () => <Spinner />
	}
);
export default function TopNav({ session }: ClientSession) {
	const router = useRouter();
	const navigateTo = (path: string) => {
		router.push(path);
	};
	const navLinkAttributes = (path: string) => {
		return {
			href: '#',
			onClick: () => navigateTo(path),
			className: `${Navbarstyles.link}`
		};
	};
	return (
		<Flowbite>
			<Navbar
				fluid={true}
				rounded={true}
				className='bg-navbarBgLight dark:bg-navbarBgDark'
			>
				<Navbar.Brand href='#' onClick={() => navigateTo('/')}>
					<span className={Navbarstyles.brand}>Ticketing System</span>
				</Navbar.Brand>
				<Navbar.Toggle />

				<Navbar.Collapse>
					<Navbar.Link {...navLinkAttributes('/about')}>About</Navbar.Link>

					<Navbar.Link {...navLinkAttributes('/contact')}>Contact</Navbar.Link>
					<RenderDropdown session={session} navigate={navLinkAttributes} />
					<Suspense>
						<DarkThemeToggle />
					</Suspense>
				</Navbar.Collapse>
			</Navbar>
		</Flowbite>
	);
}

function RenderDropdown({
	session,
	navigate
}: {
	session: SessionData;
	navigate: (path: string) => object;
}) {
	if (session.isLoggedIn) {
		return (
			<>
				<Dropdown
					suppressHydrationWarning
					arrowIcon={false}
					inline
					label={
						<Navbar.Link className={`${Navbarstyles.link}`}>
							{session.username}
						</Navbar.Link>
					}
					placement='top'
				>
					<Dropdown.Item {...navigate('/profile')}>Profile</Dropdown.Item>
					<Dropdown.Item {...navigate('/settings')}>Settings</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item {...navigate('/logout')}>Logout</Dropdown.Item>
				</Dropdown>
			</>
		);
	} else {
		return (
			<>
				<Navbar.Link {...navigate('/login')}>Login</Navbar.Link>
				<Navbar.Link {...navigate('/register')}>Register</Navbar.Link>
			</>
		);
	}
}
