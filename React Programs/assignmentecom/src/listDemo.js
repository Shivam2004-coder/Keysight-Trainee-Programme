import React from "react";

function ListItem(props) {
    const item = props.item;

    return(
        <li>{item}</li>
    )
}

function NameList(props){
    const myList = props.myList;

    const listitem = myList.map((item) => (
        <ListItem key={item} item={item} />
    ));


    return (
        <div>
            <h2>Below is the list of items :</h2>
            <ol>{listitem}</ol>
        </div>
    )

}

export default NameList