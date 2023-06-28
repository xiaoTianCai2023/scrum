import { Divider, List, Popover, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { select_project_list } from '../../../redux/slice/project'


function ProjectPopover() {

    let list = useSelector(select_project_list);
    list = list.filter((item) => {
        return item.collect
    })

    let content = (
        <div className='project_create'>
            <List>
                {
                    list.map((item) => {
                        return (
                            <List.Item key={item._id}  className="project_listItem">
                                <Link to={`/project/${item._id}/kanban`}>{item.name}</Link>
                            </List.Item>
                        )
                    })
                }

            </List>
        </div>
    )

    return (
        <Popover placement={'bottom'} content={content}>
            <h2 style={{ cursor: 'pointer' }}>收藏项目</h2>
        </Popover>
    )
}


export default ProjectPopover