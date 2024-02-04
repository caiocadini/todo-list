// pages/api/todos/[userId]/[taskId].js
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {

      // Get user ID and task ID from the URL
      const { userId, taskId } = req.query;
  

      const authResponse = await fetch(`http://localhost:3001/todos/${userId}`);

      if (!authResponse.ok) {
        res.status(401).json({ success: false, message: 'Authentication failed' });
        return;
      }

      const userData = await authResponse.json();
      console.log(userData.todo);
      // Find the user and the task to remove
      if (userData) {
        const index = userData.todo.findIndex(task => task.id === taskId);
        console.log(index);
        if (index !== -1) {
          userData.todo.splice(index, 1);
          const response = await fetch(`http://localhost:3001/todos/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ todo: userData.todo }),
          });
          res.status(200).json({ success: true, message: 'Task removed successfully' });
          return;
        };
        }

      res.status(404).json({ success: false, message: 'Task not found' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {  
    try {

      // Get user ID and task ID from the URL
      const { userId, taskId } = req.query;
  

      const authResponse = await fetch(`http://localhost:3001/todos/${userId}`);

      if (!authResponse.ok) {
        res.status(401).json({ success: false, message: 'Authentication failed' });
        return;
      }

      const userData = await authResponse.json();
      console.log(userData.todo);
      // Find the user and the task to remove
      if (userData) {
        const index = userData.todo.findIndex(task => task.id === taskId);
        console.log(index);
        if (index !== -1) {
          if (userData.todo[index].category === 'urgente'){
            userData.todo[index].category = 'bomfazer';
          } else{
            userData.todo[index].category = 'urgente';
          }
          const response = await fetch(`http://localhost:3001/todos/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ todo: userData.todo }),
          });
          res.status(200).json({ success: true, message: 'Task removed successfully' });
          return;
        };
        }

      res.status(404).json({ success: false, message: 'Task not found' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
   
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
