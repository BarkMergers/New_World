import AvatarIcon from '/genericAvatar.png'

export default function Avatar({ size = 16, title }: { size?: number, title: string | undefined }) {

    const customStyle = title == undefined || title == null ? {
        "filter": "greyscale(1)"
    } : {}


    return (
        <div className="avatar" style={ customStyle } title={ title == undefined ? "You are not logged in" : title }>
            <div className={`rounded-full border border-gray-400`} style={{ height: size + "rem", width: size + "rem"}} >
                <img src={AvatarIcon} />
            </div>
        </div>
    )
}