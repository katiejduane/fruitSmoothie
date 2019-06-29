var express = require('express');
var router = express.Router();

const withAuth = require('../middleware/withAuth');
const projectController = require('../controllers/projects');

// GET home page

router.get('/', withAuth, projectController.getIndex);

// GET types to load in dropdown menu
router.get('/addNew', withAuth, projectController.getTypes);

// POST a new project
router.post('/addNew', withAuth, projectController.postNewProject);

// GET the details of a project
router.get('/view/:projId', withAuth, projectController.getProject);

// // POST deleted project
// router.post('/delete/:projId', withAuth, projectController.deleteProject);

// // GET project to edit
// router.get('/update/:projId', withAuth, projectController.getUpdateProject);

// // POST project to edit 
// router.post('/update:projId', withAuth, projectController.postUpdateProject);

// // GET projects in list by STATUS // i may not need if i can conditionally render with react router
// router.get('/view/:statusId', withAuth, projectController.getByStatus);

// // GET projects in list by TYPE // i may not need if i can conditionally render with react router
// router.get('/view/:typeId', withAuth, projectController.getByType);

// GET archived projects
router.get('/archive', withAuth, projectController.getArchive);



module.exports = router;
