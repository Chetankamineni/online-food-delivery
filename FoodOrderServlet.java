import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FoodOrderServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Read JSON order data from request manually
        StringBuilder jsonData = new StringBuilder();
        String line;
        BufferedReader reader = request.getReader();
        while ((line = reader.readLine()) != null) {
            jsonData.append(line);
        }

        // Simulate order ID generation
        int orderId = (int) (Math.random() * 10000);

        // Create response JSON manually
        String jsonResponse = "{\"orderId\": " + orderId + "}";
        out.print(jsonResponse);
        out.flush();
    }

    // Handle GET requests to prevent 405 error
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        response.getWriter().write("GET method is not supported. Use POST instead.");
    }
}

