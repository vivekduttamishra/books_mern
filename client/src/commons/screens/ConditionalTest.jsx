import Conditional from "../../utils/components/Conditional";


const ConditionalTest = () => {

    let user1 = { name: 'John', age: 25 };
    let user2 = null;

    return <div>
        <h1>Conditional Test</h1>

            <Conditional condition={user1}>
                {user1.name}
            </Conditional>

            <Conditional condition={user2}>
                {user2.name}
            </Conditional>


    </div>
}

export default ConditionalTest;