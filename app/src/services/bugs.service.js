import http from "../http-common";

class BugDataService {
    getAll() {
        return http.get("/bugs");
    }
    
    get(id) {
        return http.get(`/bugs/${id}`);
    }
    
    create(data) {
        return http.post("/bug", data);
    }
    
    update(id, data) {
        return http.put(`/bugs/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/bug/${id}`);
    }
    
    deleteAll(id) {
        return http.delete(`/bug`)
    }
}

export default new BugDataService();
