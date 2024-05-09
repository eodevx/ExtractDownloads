from flask import Flask
from flask import request
import re
import json
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route('/', methods = ["GET","POST"])
def handle_request():
    print ("Tet")
    urllist = []
    index = 0
    urlliststring = ""
    split = " "
    first = True
    sampletext = "Hello https://google.com  https://openapi.com"
    realtext = str(request.args.get("input"))



    for line in realtext.split(" "):


        urls = re.findall('(https?://\S+)', line)
        #print (urls)
        for item in urls:
            urllist.append(item)

    for y in urllist:
            if "drive.google" in y:
                    y = y.replace("file/d/","uc?export=download&id=")
                    y = y.replace("/view?usp=drive_link","")
                    y = y.replace("/view","")
            else:
                    print(y + "Is not directly downloadable")

            urllist[index] = y
            index +=1
    print (urllist)
    for item in urllist:

        if first == True:
            urlliststring += item
            first = False
        elif first == False:
            urlliststring += split + item
    print(urlliststring)
    dataset = {"urlliststring":urlliststring}
    json_dump = json.dumps(dataset)
    print("1")
    return json_dump
app.run(port=9001, debug=True)
