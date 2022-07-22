---
slug: "Debug-version-in-device"
title: "Debug version in device"
description: "Documentation for debugging version in device"

---
# iOS

To debug on iOS, you need to dump the app on your computer, you can do it like that :

Xcode has a built-in feature for inspecting the file system of developer installed apps on an iOS device. 

To achieve this, connect your device to your Mac and select Window > Devices in the Xcode menubar. Then select your device in the left pane under the Devices section. This will show a list of developer installed apps for that device. Select the app you want to inspect and then the select the gear icon near the bottom of the screen. Here you can view the current file system by selecting Show Container or download a snapshot of it. Selecting Download Container... will download and export a snapshot of the file system as a .xcappdata file that you can browse through. Right-click on this file and select Show Package Contents to open the folder. Open the App Data folder, and you should now see a few folders like Documents, Library, tmp, etc.

![image](https://user-images.githubusercontent.com/4084527/166708589-8d500351-e140-41c3-bea2-a037fe35243e.png)

Then you will find version in 2 folders:

`library/NoCloud/ionic_built_snapshots` who is necessary after app reboot

and `documents/versions` for hot reload 


# Android

To debug on Android, you just need to access the device from Android Studio:

Click View > Tool Windows > Device File Explorer or click the
Device File Explorer button in the tool window bar to open
  the Device File Explorer.
  Select a device from the drop down list.
  Interact with the device content in the file explorer window. Right-click
  on a file or directory to create a new file or directory, save the selected file
  or directory to your machine, upload, delete, or synchronize. Double-click a
  file to open it in Android Studio.

  Android Studio saves files you open
  this way in a temporary directory outside your project. If you make
  modifications to a file you opened using the Device File Explorer, and would
  like to save your changes back to the device, you must manually upload the
  modified version of the file to the device.

![image](https://user-images.githubusercontent.com/4084527/166708728-8f96fc73-5d90-426f-8d27-301697347a5f.png)

When exploring a device's files, the following directories are particularly useful:

data/data/app_name/

Then Find the `versions` folder to see all the folder versions

on android only one folder is enough
