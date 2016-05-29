function Group(name) {
    this.name = name;
    this.roles = [];
}

function GroupRole(account, role) {
    this.account = account;
    this.role = role;
}

Group.prototype.addRole = function(role){
    this.roles.unshift(new GroupRole(role.account, role.role));

    if(this.roles.size >= 5){
        this.roles = this.roles.slice(0, 5);
    }
};

Group.prototype.deleteRole = function(index){
    if(this.roles.size > index){
        this.roles.splice(index, 1 );
    }
};

Group.prototype.moveRole = function(index, up){
    var indexValue = this.roles[index];
    if(this.roles.size > index && (index != 4 && up) && (index != 0 && !up)){
        var swapIndex = 0;
        if(up){
            swapIndex = index + 1;
        } else {
            swapIndex = index - 1;
        }
        this.roles[index] = this.roles[swapIndex];
        this.roles[swapIndex] = indexValue;
    }
};