import AvatarIcon from '/genericAvatar.png'

export default function Avatar({ size = 16, title }: { size?: number, title?: string | undefined | null }) {

    const customStyle = title == undefined || title == null ? {
        "filter": "grayscale(1)"
    } : {};

    return (
        <div className="avatar" title={ (title == undefined || title == null) ? "You are not logged in" : title }>
            <div className={`rounded-full border border-gray-400`} style={{ height: size + "rem", width: size + "rem"}} >
                <img style={ customStyle } src={AvatarIcon} alt={(title == undefined || title == null) ? "You are not logged in" : title} />
            </div>
        </div>
    )
}