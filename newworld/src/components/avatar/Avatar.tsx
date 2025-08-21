export default function Avatar({ size = 16 }: { size?: number }) {

    return (
        <div className="avatar">
            <div className={`rounded-full border border-gray-400`} style={{ height: size + "rem", width: size + "rem"}} >
                <img src="https://img.daisyui.com/images/profile/demo/distracted2@192.webp" />
            </div>
        </div>
    )
}