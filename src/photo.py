import cv2
image_path = "./src/assets/ev/ev2.jpg"
image = cv2.imread(image_path)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (5, 5), 0)
edges = cv2.Canny(blurred, 50, 150)
dilated = cv2.dilate(edges, None, iterations=2)
contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, 
cv2.CHAIN_APPROX_SIMPLE)
triangle_color = (0, 0, 255)  # Kırmızı renk
triangle_thickness = 2
max_triangles = 10
triangles_count = 0

for contour in contours:
    if triangles_count >= max_triangles:
        break
    epsilon = 0.03 * cv2.arcLength(contour, True)
    approx = cv2.approxPolyDP(contour, epsilon, True)
    if len(approx) >= 3:
        if cv2.isContourConvex(approx):
            if triangles_count >= max_triangles:
                break
            cv2.drawContours(image, [approx], 0, triangle_color, triangle_thickness)
            triangles_count += 1
cv2.imshow("Triangle Detection Result", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
