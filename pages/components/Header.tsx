import { format } from "date-fns";
import { useContext } from "react";
// import { ThemeContext } from '../app';
import { useSession, signIn, signOut } from "next-auth/react";
// import { Router } from 'next/router';
import { useRouter } from "next/navigation";

function Header() {
	// const { theme, toggleTheme } = useContext(ThemeContext);
	const { data: session, status } = useSession();
	const Router = useRouter();
	// console.log('session', session);

	// console.log('header status', status)
	return (
		<div className='flex justify-between items-center w-screen px-5 bg-green-300 h-11'>
			<div className='font-bold'>{format(new Date(), "MMMM do, yyyy")}</div>
			<div className='font-bold'>
				{status === "authenticated" && (
					<>
						<button
							className='font-bold'
							onClick={() => signOut({ callbackUrl: "/" })}
						>
							{session && session.user?.name}, Sign out
						</button>
					</>
				)}
				{status === "unauthenticated" && (
					<>
						<button className='font-bold' onClick={() => Router.push("/login")}>
							Sign in
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;