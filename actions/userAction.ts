import { useDispatch } from "react-redux";
import { fetchUserInfoFailure, fetchUserInfoStart, fetchUserInfoSuccess, updateOrganizationInfoFailure, updateOrganizationInfoStart, updateOrganizationInfoSuccess, updateUserInfoFailure, updateUserInfoStart, updateUserInfoSuccess, uploadProfilePictureFailure, uploadProfilePictureStart, uploadProfilePictureSuccess } from "../redux/userinfo";
import { getLoggedInUserInfo, getProfilePicture, updateProfile, uploadProfilePicture } from "../api/user";
import { UserInfo, updateOrganizaitonInfoArgs, updateProfileArgs } from "../types/General";
import { updateCreateOrganizaitonInfoAndStatues } from "../api/admin";

export const useUserInfoAction = () => {
    const dispatch = useDispatch();
    const fetchUserInfoAction = async () => {
        try {
            dispatch(fetchUserInfoStart());
            const UserInfo = await getLoggedInUserInfo();
            const user = UserInfo.user;
            console.log(UserInfo)
            const profilePicture = await getProfilePicture(user._id);
            user.base64ProfilePicture = profilePicture;
            const userinfo: UserInfo = { user: user, organization: UserInfo.organization, totalReportCount: UserInfo.totalReportCount, totalResolvedCount: UserInfo.totalResolvedCount, organizationAdmins: UserInfo.organizationAdmins, statuses: UserInfo.statuses }
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

    const updateUserInfoAction = async (userinfo: updateProfileArgs) => {
        try {
            dispatch(updateUserInfoStart());
            await updateProfile(userinfo);
            dispatch(updateUserInfoSuccess(userinfo))
        } catch (err) {
            dispatch(updateUserInfoFailure(err.message));
        }
    }

    const updateOrganizaitonInfo = async (organizationInfo:updateOrganizaitonInfoArgs) => {
        try {
            dispatch(updateOrganizationInfoStart());
            const res = await updateCreateOrganizaitonInfoAndStatues({organization:organizationInfo.organization,statuses:organizationInfo.statuses,statusesToDelete:organizationInfo.statusesToDelete})
            console.log(res)
            dispatch(updateOrganizationInfoSuccess({organization:res.newOrganizationInfo,statuses:res.newStatuses}))
        } catch (err) {
            dispatch (updateOrganizationInfoFailure(err.message))  
        }
        

    }


    return {
        fetchUserInfoAction,
        uploadProfilePictureAction,
        updateUserInfoAction,
        updateOrganizaitonInfo,
    }
}
