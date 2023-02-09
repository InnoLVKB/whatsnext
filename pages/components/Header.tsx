import { format } from "date-fns";
import { useContext } from "react";
// import { ThemeContext } from '../app';
import { useSession, signIn, signOut } from "next-auth/react";
// import { Router } from 'next/router';
import { useRouter } from "next/navigation";
import { Montserrat } from "@next/font/google";
import { Switch } from '@headlessui/react'
import { useDragContext } from "../../context/DragContext";

const montserrat = Montserrat({ subsets: ["latin"], weight: "500" });

function Header({ user }) {
	// const { theme, toggleTheme } = useContext(ThemeContext);
	const { data: session, status } = useSession();
	const Router = useRouter();
	// console.log('session', session);
	const { dragStatus, setDragStatus } = useDragContext();

	const handleSignout = () => {
		localStorage.removeItem("user");
		Router.push("/login");
	};
	return (
		<div className='flex justify-between items-center w-screen px-5 bg-pink-100 h-11 border-b-2 border-b-black'>
			<div className='hidden lg:flex'>
				<Switch
					checked={dragStatus}
					onChange={setDragStatus}
					className={`${
						dragStatus ? 'bg-green-600' : 'bg-zinc-400'
					} relative inline-flex h-6 w-11 items-center rounded-full`}
				>
					<span className="sr-only">Enable dragging</span>
					<span
						className={`${
							dragStatus? 'translate-x-6' : 'translate-x-1'
						} inline-block h-4 w-4 transform rounded-full bg-white transition`}
					/>
				</Switch>
				<span className="ml-2 font-bold mx-10">{dragStatus ? 'drag enabled' : 'drag disabled'}</span>
			</div>
			<div className='font-bold lowercase'>
				<span className={montserrat.className}>
					{format(new Date(), "MMMM do, yyyy")}
				</span>
			</div>
			<div className='font-bold'>
				{user === "" ? (
					<button className='font-bold' onClick={() => Router.push("/login")}>
						Sign in
					</button>
				) : (
					<div>
						<span className='mx-2'>{user.username}</span>
						<button
							className='bg-transparent text-black font-semibold py-1 px-4 border border-black hover:border-transparent rounded'
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
