import os
import json

def path_to_dict(path):
    d = {'name': os.path.basename(path)}
    d['path'] = path.replace('.\\','CD Resources/').replace('\\','/')
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir(path)]

    else:
        d['type'] = "file"
    return d
	
with open('fileStructure.json', 'w') as open_file:
	open_file.write(json.dumps(path_to_dict('.')))

print 'complete'	

print json.dumps(path_to_dict('.'))

