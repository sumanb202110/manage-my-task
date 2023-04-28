import UsernameTag from "@/components/usernameTag/usernameTag"
import { store } from "@/store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe('UsernameTag', () => {
    it('render username tag', () => {
        render(
            <Provider store={store}>
                {/* <UsernameTag/> */}
            </Provider>
        )
    })
})