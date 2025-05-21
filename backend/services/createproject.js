import Project from '../models/projectmodel.js';

async function createproject({ name, userid }) {
    try {
        if (!name || !userid) {
            throw new Error('Please provide both name and userid');
        }

        const newProject = await Project.create({ name, user: [userid] });
        return newProject;
        
    } catch (error) {
      
       
        
        
        throw new Error(error.message);
    }
}

export default createproject;
