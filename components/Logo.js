import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<div className="hidden lg:flex">
			<Link aria-label="Home" href="/">
				<Image src="/logo.svg" alt="Protocol" className="h-6 w-auto" width={1000} height={24}/>
			</Link>
		</div>
	);
}
