import { format } from "date-fns";
import { useContext } from "react";
// import { ThemeContext } from '../app';
// import { Router } from 'next/router';
import { useRouter } from "next/navigation";

function Header({ user }) {
	// const { theme, toggleTheme } = useContext(ThemeContext);
	// const { data: session, status } = useSession();
	const Router = useRouter();
	// console.log('session', session);

	const handleSignout = () => {
		localStorage.removeItem("user");
		Router.push("/login");
	};
	return (
		<div className='flex justify-between items-center w-screen px-5 bg-green-300 h-11'>
			<div className='font-bold'>{format(new Date(), "MMMM do, yyyy")}</div>
			<div className='font-bold'>
				{user === "" ? (
					<button className='font-bold' onClick={() => Router.push("/login")}>
						Sign in
					</button>
				) : (
					<div>
						{/* <span className='mx-2'>{user.username}</span> */}
						<button
							className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded'
							onClick={handleSignout}
						>
							Sign out
						</button>
					</div>
				)}
				{/* {status === "authenticated" && (
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
				)} */}
			</div>
		</div>
	);
}

export default Header;
