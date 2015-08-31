from tornado import websocket, web, ioloop, httpserver
import tornado
import ast #to convert unicode type to dict type
from Session import Session
import json

#list of WebSocket connections
connections={}

session = Session()

class WSHandler(tornado.websocket.WebSocketHandler):
	
	def open(self):
		print ("WebSocket opened")
		print ("from %s" %self.request.remote_ip)
		  
	def on_message(self, message):
		messageHandler.handleIncomingMsg(message,self,1)
		
 
	def on_close(self):
	    print ("WebSocket closed")

class MessageHandler:
	def __init__(self):
		pass

	def handleIncomingMsg(self, data, socket,pid):
		try:
			print ('message received %s' %data)
			
			#converts the unicode data that arrives into a dict
			data = ast.literal_eval(data)
			
			type = data['type']

		except :
			print ("Unexpected error:" +  sys.exc_info()[0])
			type = 'error'
			print('except')
					

		if type == "join":
			#add to connection list
			self.addToConnectionList(socket, data)
			success = session.addPlayer(data['pid'])
						
			if(success):
				self.sendMessage(data['pid'], "state", str(session.getState())  )
			else:
				self.sendMessage(data['pid'], "error", "No available space: Two players already in the game!")  
		   
		elif type == "updateState":
			self.updateState(data, pid)
		elif type == "ballUpdate":
			self.sendMessage('IOSPlayer', type, data)
		elif type == "paddleUpdate":
			self.sendMessage('IOSPlayer', type, date)
		elif type == "iosPaddleUpdate":
			self.sendMessage('Android Client', type, data)
		else:
			msg = 'Error reading game request. Please make sure message type is either join, updateState, or...'
			message={'type':'error', "data":msg}
			print ('Error reading game request.')
			

	def addToConnectionList(self, socket, message):
		socket.id= message['pid']
		connections[socket.id]=socket
		print(str(socket.id) + " joined")

	#add in types 
	def sendMessage(self,pid,type,data):
		try:
			msg=dict()
			msg["type"]=type;
			msg["data"]=data;
			msg=json.dumps(msg)
			connections[pid].write_message(msg)
		except KeyError:
			print("Player " + str(pid) + " isn't connected")
	

#needs to be after the class def
messageHandler = MessageHandler();
 

app= tornado.web.Application([
	#map the handler to the URI named "wstest"
	(r'/wstest', WSHandler),
])
 
if __name__ == '__main__':
	app.listen(8080)
	tornado.ioloop.IOLoop.instance().start()