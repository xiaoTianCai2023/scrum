import ProjectTable from './components/project_table'
import CreateProjectModal from './components/create_project_modal'
import { useDispatch } from 'react-redux'
import { set_project_modal } from '../redux/slice/project'
import ProjectSearch from './components/project_search'

function Project() {
    const dispatch = useDispatch()

    function create_project_click() {
        dispatch(set_project_modal({
            show: true,
            type: 'create'
        }))
    }
    // console.log('project render')
    return (
        <div className='project_body_wrap'>
            <div className='project_title_wrap'>
                <h1>项目列表</h1>
                <button onClick={create_project_click}>创建项目</button>
            </div>
            <div className='project_search_wrap'>
                {/* <Profiler id="ProjectSearch" onRender={onRenderCallback}> */}
                    <ProjectSearch />
                {/* </Profiler> */}

            </div>
            <div className='project_table_wrap'>
                {/* <Profiler id="ProjectTable" onRender={onRenderCallback}> */}
                    <ProjectTable />
                {/* </Profiler> */}
            </div>
            <CreateProjectModal />
        </div>
    )
}

export default Project