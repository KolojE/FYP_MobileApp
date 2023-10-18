import { useDispatch } from "react-redux"
import { getMembers, activateMember, deleteDeactivatedMember } from "../api/admin"
import { deleteComplainantError, deleteComplainantSuccess, fectchProfilePictureSuccess, fetchComplainantsError, fetchComplainantsSuccess, startAction, updateComplainantError, updateComplainantSuccess } from "../redux/complainant"
import { getProfilePicture } from "../api/user"


export const useComplainantAction = () => {

    const dispatch = useDispatch()

    const getComplainants = async () => {
        try {
            dispatch(startAction())
            const res = await getMembers()
            dispatch(fetchComplainantsSuccess(res))
            res.forEach(async (complainant) => {
                const base64ProfilePicture = await getProfilePicture(complainant._id)
                dispatch(fectchProfilePictureSuccess({ id: complainant._id, base64ProfilePicture }))
            })
        } catch (err) {
            dispatch(fetchComplainantsError(err.message))
            console.error(err.message)
        }
    }

    const activateComplainant = async (id: string, activationStatus: boolean) => {
        try {
            dispatch(startAction())
            await activateMember(id, activationStatus)
            dispatch(updateComplainantSuccess(id))
        } catch (err) {
            dispatch(updateComplainantError(err.message))
            console.error(err.message)
        }
    }

    const deleteDeactivatedComplainant = async (id: string) => {
        try {
            dispatch(startAction())
            await deleteDeactivatedMember(id)
            dispatch(deleteComplainantSuccess(id))
        } catch (err) {
            dispatch(deleteComplainantError(err.message))
            console.error(err.message)
        }
    }

    return { getComplainants,activateComplainant,deleteDeactivatedComplainant }
}