// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var awsRoleStorage;

function awsRoleStorageReady(){
    //clear roles list
    $("#roles-list").empty();
    //add roles to list
    awsRoleStorage.roles.forEach(function(role){
        $("#roles-list").append('<li class="list-group-item" data-xaws-account="' + role.account +'" data-xaws-role="' + role.role +'" data-xaws-displayname="' + role.displayName +'">' + role.account + '/' + role.role +'</li>');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    $( "#roles-list" ).on( "click", "li", function() {
        var tabCreateObject = {
            url:'https://signin.aws.amazon.com/switchrole?account=' + $(this).data('xaws-account') + '&roleName=' + $(this).data('xaws-role') + '&displayName=' + $(this).data('xaws-displayname')
        };
        chrome.tabs.create(tabCreateObject, function(tab){
            var executeScriptObject = {
                file: 'js/inject.js'
            };
            chrome.tabs.executeScript(tab.id, executeScriptObject);
        })
    });

    $( "#content" ).on( "awsRoleStorageReady", function( event ) {
        awsRoleStorageReady();
    });

    awsRoleStorage = new AwsRoleStorage();
});


