import { useSelector } from "react-redux";
import { select_orgs, select_users } from "../../redux/slice/project";


// 自定义hooks

// 原则
// 1. 要兼顾各种业务情况，尽量的可复用性高
// 2. antd的组件很灵活，你可以用a写法，也可以用b写法，但是我们尽量要统一风格
function useSelectOptions() {
    const orgs = useSelector(select_orgs)
    const users = useSelector(select_users)

    const orgs_options = orgs.map((item) => {
        return {
            value: item.name,
            label: item.name
        }
    })

    const users_options = users.map((item) => {
        return {
            value: item.username,
            label: item.username
        }
    })

    const task_optiosn = [
        {
            value: 'task',
            label: 'task',
        },
        {
            value: 'bug',
            label: 'bug',
        },
    ]

    return {
        orgs_options,
        users_options,
        task_optiosn
    }
}


export default useSelectOptions;