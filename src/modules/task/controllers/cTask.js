import error from "../../../middlewares/mwError.js";

const cTask = {
  getTasks: async (req, res) => {
    try {
      const { data: tasks, error } = await req.userSupabase
        .from("tasks")
        .select("*");

      if (error) throw error;

      res.json({ success: true, tasks });
    } catch (err) {
      console.log(err);
      error.eMain(err, req, res);
    }
  },

  createTask: async (req, res) => {
    try {
      const userDataSupabase = req.userDataSupabase;
      const { title, description, status } = req.body;

      const user_id = userDataSupabase.id;

      const { data, error } = await req.userSupabase
        .from("tasks")
        .insert({ user_id, title, description, status })
        .select();

      if (error) throw error;

      res.status(201).json({ success: true, task: data[0] });
    } catch (err) {
      error.eMain(err, req, res);
    }
  },

  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;

      const { data, error } = await req.userSupabase
        .from("tasks")
        .update({ title, description, status })
        .eq("id", id)
        .select();

      if (error) throw error;

      res.json({ success: true, task: data[0] });
    } catch (err) {
      error.eMain(err, req, res);
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;

      const { error } = await req.userSupabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) throw error;

      res.json({ success: true, message: "Task deleted successfully" });
    } catch (err) {
      error.eMain(err, req, res);
    }
  },
};

export default cTask;
