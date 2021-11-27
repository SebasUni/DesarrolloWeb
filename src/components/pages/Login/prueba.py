import smtplib

correo='proyectapitransport@gmail.com'
password='axuonoteujqomjas'
sentemail = 'juan-montoya@upc.edu.co'
message ='esto es una prueba del correo de sebas'
server= smtplib.SMTP('smtp.gmail.com',587)
server.starttls()
server.login(correo,password)
server.sendmail(correo,sentemail,message)
print("enviado")
server.quit()
