import React from "react";

const Users = (props) => {
    return (
        <div>
            {props.users.map(i=><div key={i.id}>
                <span>
                    <div>
                        <img/>
                    </div>
                    <div>
                        <button>Follow</button>
                    </div>
                </span>
            </div> )}
        </div>
    );
};

export default Users;