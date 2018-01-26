A vue component to preview images use scale and rotate css3 properties 

JSON server

curl -X DELETE localhost:3000/history/1   # 删除
curl "localhost:3000/history?limit=5&offset=0" # 查
curl -i -X POST -H 'Content-type':'application/json' -d {} localhost:3000/history/ # 增
curl -X PUT -H "Content-Type: application/json" -d '{"object_kind":"merge_request","object_attributes":{"id":22,"target_branch":"master","source_branch":"master","source_project_id":57,"author_id":9,"assignee_id":null,"title":"Master Title","created_at":"2014-07-02T02:31:20.000Z","updated_at":"2014-07-02T02:36:33.008Z","milestone_id":null,"state":"closed","merge_status":"unchecked","target_project_id":55,"iid":7,"description":"description_content"}}' localhost:3000/history/ # 改
vim /etc/profile
export NODE_HOME=/opt/software/node-v8.9.0-linux-x64/bin
export PATH=$NODE_HOME:$PATH
export PhantomJs=/opt/software/phantomjs-2.1.1-linux-x86_64/bin
export PATH=$PhantomJs:$PATH
