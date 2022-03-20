import http from "../http-common";

class ProjectsDataService {
    getAll() {
        return http.get("/projects");
    }
    
    get(id) {
        return http.get(`/projects/${id}`);
    }
    
    create(data) {
        return http.post("/project", data);
    }
    
    update(id, data) {
        return http.put(`/projects/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/project/${id}`);
    }
    
    deleteAll(id) {
        return http.delete(`/project`)
    }
}

export default new ProjectsDataService();
