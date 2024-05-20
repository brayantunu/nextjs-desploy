import { Link } from "@nextui-org/react"
export default function ButtonInbox(){
    return(
        <Link className="inbox" href="/UserNotes/Inboxapi">
            <span className="icon-[heroicons--inbox-solid] w-8 h-8 text-center m-auto text-black"/>
        </Link>
    )
}