import IComplainant from "../types/Models/Complainant";
import { getProfilePicture } from "../api/user";

type MemeberListModalProps = {
    members: IComplainant[];
    setMembers: React.Dispatch<React.SetStateAction<IComplainant[]>>;
}

export default function fetchProfilePicture({ members, setMembers }: MemeberListModalProps) {

    members.forEach(async (member) => {
        if (!member.base64ProfilePicture) {
            const base64ProfilePciture = await getProfilePicture(member._id);
            if (base64ProfilePciture) {
                setMembers((prev) => {
                    return prev.map((prevMember) => {
                        if (prevMember._id === member._id) {
                            return {
                                ...prevMember,
                                base64ProfilePicture: base64ProfilePciture
                            }
                        }
                        return prevMember;
                    })
                })
            }
        }
    })
}