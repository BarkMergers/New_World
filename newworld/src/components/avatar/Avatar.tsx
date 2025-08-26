import AvatarIcon from '/genericAvatar.png'

export default function Avatar({ size = 16 }: { size?: number }) {
    return (
        <div className="avatar">
            <div className={`rounded-full border border-gray-400`} style={{ height: size + "rem", width: size + "rem"}} >
                <img src={AvatarIcon} />
            </div>
        </div>
    )
}