import http from "../http-common";

class ProjectsDataService {
    getAll() {
        return http.get("/project");
    }
    
    get(id) {
        return http.get(`/project/${id}`);
    }
    
    create(data) {
        return http.post("/project", data);
    }
    
    update(id, data) {
        return http.put(`/project/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/project/${id}`);
    }
    
    deleteAll(id) {
        return http.delete(`/project`)
    }
}

export default new ProjectsDataService();
