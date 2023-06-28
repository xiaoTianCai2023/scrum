import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { set_project_id } from "../redux/slice/drop"
import { set_ecpic_create_modal_show } from "../redux/slice/epic"
import { get_project_async } from "../redux/slice/project"
import CreateEpicModal from "./components/create_epic_modal"
import EpicList from "./components/epic_list/index"


function Epic() {
    const dispatch = useDispatch()

    function handle_click() {
        dispatch(set_ecpic_create_modal_show(true))
    }

    console.log('epic render')
    
    const params = useParams()
    const project_id = params.id

    useEffect(() => {
        dispatch(get_project_async(project_id))
        dispatch(set_project_id(project_id))
    }, [params.id])

    return (
        <div className='epic_body'>
            <div className='epic_title'>
                <button onClick={handle_click} className='epic_title_button'>创建任务组</button>
            </div>
            <EpicList />
            <CreateEpicModal />
        </div>  
    )
}

export default Epic

