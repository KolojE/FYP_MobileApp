import { useDispatch } from "react-redux";
import { fetchUserInfoFailure, fetchUserInfoStart, fetchUserInfoSuccess, uploadProfilePictureFailure, uploadProfilePictureStart, uploadProfilePictureSuccess } from "../redux/userinfo";
import { getLoggedInUserInfo, getProfilePicture, uploadProfilePicture } from "../api/user";
import { UserInfo } from "../types/General";

export const useUserInfoAction = () => {
    const dispatch = useDispatch();
    const fetchUserInfoAction = async () => {
        try {
            dispatch(fetchUserInfoStart());
            const UserInfo = await getLoggedInUserInfo();
            const user = UserInfo.user;
            const profilePicture = await getProfilePicture(user._id);
            user.base64ProfilePicture = profilePicture;
            const userinfo:UserInfo = { user: user, organization: UserInfo.organization, totalReportCount: UserInfo.totalReportCount, totalResolvedCount: UserInfo.totalResolvedCount }
            dispatch(fetchUserInfoSuccess(userinfo))
        } catch (err) {
            dispatch(fetchUserInfoFailure(err.message));
        }
    }

    const uploadProfilePictureAction = async ({ uri, base64 }: { uri: string, base64: string }) => {
        try {
            dispatch(uploadProfilePictureStart())
            await uploadProfilePicture(uri);
            dispatch(uploadProfilePictureSuccess(base64))
        } catch (err) {
            dispatch(uploadProfilePictureFailure(err.message));
        }
    }

    return {
        fetchUserInfoAction,
        uploadProfilePictureAction
    }
}
