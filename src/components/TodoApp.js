import React, { useState, useEffect } from "react";
import "./todoapp.css";
import firebase from './firebase';

// import {reverseArray} from './misc'
function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [idOfUpdate, setIdOfUpdate] = useState(null);
  const [fact, setFact] = useState();
  
useEffect(() => {
  populate();
},[]);

useEffect(() => {
  let id = idOfUpdate;
  if(id !== null) {
  markCompleteGlobal();
  }
},[fact]);

const markCompleteGlobal = () => {
  let id = idOfUpdate;
  const itemToUpdate = firebase
  .firestore()
  .collection("todos")
  .doc(id);
  itemToUpdate.update({
  isCompleted: fact
});
setIdOfUpdate(null);
setFact(null);
};

const handleChange = (e) => {
  setTask(e.target.value);
};
  // Create to do list into firebase storage
const AddTask = () => {
  const datas = {
    id: firebase
    .firestore()
    .collection("todos")
    .doc().id
  }
  if (task !== "") {
  const db = firebase.firestore();
  db.collection("todos")
  .doc(datas.id)
  .set(
    {
      id: datas.id,
      value: task,
      isCompleted: false,
    }
  )
  .then(() => {populate()})
  .then(() => setTask(""))
  } 
};
  const populate = () => {
    setTaskList([])
    return firebase
      .firestore()
      .collection("todos")
      .get()
      .then(function(querySnapshort){
        querySnapshort.forEach(function(doc){
          let newData = doc.data();
          if(tasklist.indexOf(newData.id) === -1) {
            setTaskList(arr => {
              return [newData,...arr];
            })
          } 
        })
      })
         
  }
  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(tasklist.filter((t) => t.id != id));
    const db = firebase.firestore();
    db.collection("todos")
    .doc(id)
    .delete()
  };
  const taskCompleted = (id) => {
    // setTaskList(newTaskList);
    setIdOfUpdate(id);
    setTaskList(
      tasklist.map(task => {
        if(task.id === id) {
          task.isCompleted = !task.isCompleted;
          setTimeout(function(){setFact(task.isCompleted)} ,1000)
        }
        return task;
      })
    )
  };
  return (
    <div className="todo">
      <input
        type="text"
        name="text"
        value={task}
        id="text"
        onChange={(e) => handleChange(e)}
        placeholder="Add task here..."
      />
      <button className="add-btn" onClick={AddTask}>
        Add
      </button>
      <br />
      {tasklist !== [] ? (
        <ul>
          {tasklist.map((t, i) => (
            <li key={i} className={t.isCompleted ? "crossText" : "listitem"}>
              {t.value}
              <button
                className="completed"
                onClick={() => taskCompleted(t.id)}
              >
                Completed
              </button>
              <button className="delete" onClick={(e) => deletetask(e, t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
export default TodoApp;