import { Divider, List, Popover, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { select_users } from '../../../redux/slice/project'


function UserPopover() {

    const users = useSelector(select_users)

    let content = (
        <div className='project_create'>
            <Typography.Text type={'secondary'}>组员列表</Typography.Text>
            <List>
                {
                    users.map((item) => {
                        return (
                            <List.Item key={item.username} className="user_listItem">
                                <p>{item.username}</p>
                            </List.Item>
                        )
                    })
                }
            </List>
            {/* <Divider /> */}
        </div>
    )

    return (
        <Popover placement={'bottom'} content={content}>
            <h2 className='project_btn' style={{ cursor: 'pointer' }}>组员</h2>
        </Popover>
    )
}

export default UserPopover