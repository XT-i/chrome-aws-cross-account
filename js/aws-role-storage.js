function AwsRoleStorage(){
    chrome.storage.sync.get(null, this.initStorage.bind(this));
}

AwsRoleStorage.prototype.initStorage = function(result){
    if (result.awsRoleStorage != undefined){
        this.version = result.awsRoleStorage.version;
        this.roles = result.awsRoleStorage.roles;
        this.groups = result.awsRoleStorage.groups;
        console.log(this);
    } else {
        this.version = 1;
        this.roles = [];
        this.groups = [];
        chrome.storage.sync.set({"awsRoleStorage": this}, function(){console.log("AWS role storage created")});
        console.log(this);
    }
};

AwsRoleStorage.prototype.updateStorage = function(){
    console.log(JSON.stringify(this));
    chrome.storage.sync.set({"awsRoleStorage": this}, function(){console.log("AWS role storage updated")});
};

AwsRoleStorage.prototype.addRole = function(role){
    this.roles.push(role);
    this.roles.sort(compareRoles);
    this.updateStorage();
};

AwsRoleStorage.prototype.deleteRole = function(index){
    if(this.roles.size > index){
        this.roles.splice(index, 1 );
    }
    this.roles.sort(compareRoles)
};

AwsRoleStorage.prototype.addGroup = function(group){
    this.groups.push(group);
    this.roles.sort(compareGroups)
};

AwsRoleStorage.prototype.deleteGroup = function(index){
    if(this.groups.size > index){
        this.groups.splice(index, 1 );
    }
    this.roles.sort(compareGroups)
};

function compareRoles(a,b) {
    if (a.account < b.account) {
        return -1;
    } else if (a.account > b.account) {
        return 1;
    } else {
        if (a.role < b.role) {
            return -1;
        } else if(a.role > b.role) {
            return 1;
        } else {
            return 0;
        }
    }
}

function compareGroups(a,b) {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
}
