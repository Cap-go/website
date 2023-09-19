---
slug: "setup-ci-and-cd-gitlab"
title: Setup CI/CD in Gitlab
description: Learn how to supercharge your software development workflow by setting up Continuous Integration and Continuous Deployment (CI/CD) with GitLab.
author: Anik Dhabal Babu
author_url: https://x.com/anikdhabal
created_at: 2023-09-14
updated_at: 2023-09-14
head_image: "/CI_CD_in_Gitlab.webp"
head_image_alt: CI/CD in GitLab
tag: CI/CD
published: true
next_blog: ""

---

This article will guide you on how to do CI/CD pipeline setup with GitLab.

## Introduction

For a developer, running and testing your code offline is one thing and deploying online for development or production is another. Either you are merging a reviewed PR (Pull Request) or you are pushing your code directly to the staging/development branch, you might have to repeatedly do that manually or you can choose to automate the process and saves time.

## Requirements

Before we dive into the `CI/CD` implementation, we should make sure the following are ready with us.

    1. GitLab repository

    2. Remote server

Create a repository on GitLab and set up your project in it. We also need a remote machine with `git` installed on it. The remote instance can be used to run our pipeline scripts and also deploy our project.

## Setting up GitLab runner agent

GitLab Runner is a tool that we used to run our jobs and send the results back to GitLab. It is designed to run on Linux, macOS, and Windows.

1. **Install GitLab Runner**

Here is the [link](https://docs.gitlab.com/runner/) to different installation methods, you can choose one that fits for your remote machine.

The binary installation method for `Linux x86-64`, is what I'm showing here. Basically, just download the binary file to the `/usr/local/bin/` directory and make it executable.

Choose the [binary](https://docs.gitlab.com/runner/install/linux-manually.html#using-binary-file) fle according to the system architecture. Type arch on your terminal to know the system architecture.

* Download the binary

      `sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64`

* Give permission to execute

       `sudo chmod +x /usr/local/bin/gitlab-runner`

* Create GitLab CI user

       `sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash`

* Install and run as service

       `sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner`
       `sudo gitlab-runner start`

2. **Register the Runner**

There are three types of runners:

    
 1. [Shared](https://docs.gitlab.com/ee/ci/runners/#shared-runners) (for all projects)
 2. [Group](https://docs.gitlab.co/ee/ci/runners/#group-runners) (for all projects in a group)
 3. Specific (for specific projects)

 We're going to set up a specific runner here. So that make sure you have the ownership of the project. Alright, let's go through the following steps to register our runner.

* Goto to the project's settings > CI/CD and expand the Runner section.
* Click on the "Disable shared Runners" button If it's enabled.
* Note the registration token.

Make sure you have got the registration token, then we're ready to register our GitLab Runner.

* Run the following command.

       sudo gitlab-runner register

The command will prompt you a few questions for the registration

1. Enter coordinator URL (https://gitlab.com/)
2. Enter the token you got.
3. Enter a description for this runner.
4. Enter the tags for the runner. (Leave it empty if you're not using multiple runners for the project.)
5. Select the [runner executer](https://docs.gitlab.com/runner/executors/README.html) (eg: shell )

We have one more step to do, is permitting root privileges to the GitLab Runner. It is not necessary If you're not going to use any permission needed (`sudo`) commands in your ci/cd job

Add the following line to the end of the `/etc/sudoers file`.

          gitlab-runner ALL=(ALL) NOPASSWD:ALL

All set, now we're ready to move on to the pipeline configuration.

3. **Pipeline configuration**

We need the `.gitlab-ci.yml` file in the root of the repository, which defines the structure and order of pipelines and determines what to execute using *GitLab Runner*.

Let's dive into the fundamentals of the YAML file.

  * jobs

It is the most fundamental element of the `.gitlab-ci.yml` file. As its name suggests, here is we write our scripts. Jobs are picked by runners and executed within the environment of the `runner`.

                    job 1:
                    script: "execute script for job1"

                    job 2:
                    script: "execute script for job2"

  * stages

  It helps to define different stages in the pipeline. The definition order will be the final execution order of the jobs.

                  stages:
                      - build
                      - test
                      - deploy

  * stage

  It relies on stages and allows to group jobs into different stages. The jobs of the same stage are executed in parallel.

                  stages:
                      - build
                      - test
                      - deploy

                   job 0:
                     stage: .pre
                     script: make something useful before build stage

                  job 1:
                    stage: build
                    script: make build dependencies

                  job 2:
                    stage: build
                    script: make build artifacts

                  job 3:
                    stage: test
                    script: make test

                  job 4:
                    stage: deploy
                    script: make deploy

                  job 5:
                    stage: .post
                    script: make something useful at the end of the pipeline

The `.pre` and `.post` stages are available to every pipeline. User-defined stages are executed after `.pre` and before `.post`.

There are also two edge cases worth mentioning:

1. If no stages are defined in `.gitlab-ci.yml`, then the build, test, and deploy are allowed to be as the job's stage by default.

2. If a job does not specify a stage, the job will automatically be assigned to the test stage. 

4. **Continuous Integration (CI)**

You can set up a set of scripts to build and test your application on every code push that could save your application from sudden surprises.

Let's do a simple CI.

         stages:
               - test

         Test:
           stage: test
           script:
             - echo "write your test here."
             - test -f "index.html"

The above job will check the index.html file exists or not. If it does not exist, the job will fail. Here the CI runs on every code push to the repository, Although we haven't given any control to the job Test.

Alright, Let's move on to the delivery.

5. **Continuous Delivery (CD)**

Continuous delivery is a development practice where code changes automatically prepared for a release to production. It is an extension of continuous integration to make sure that you can release new changes to your customers quickly in a sustainable way.

           stages:
             - test
             - deploy

           Test:
             stage: test
             script:
              - echo "write your test here."
              - test -f "index.html"

            Deploy:
              only:
                refs:
                  - master
              stage: deploy
              script:
                  - sudo cp -R ./index.html /var/www/html/

Here you see a Deploy job with the only keyword, which lets the job trigger only on the master branch actions.

Whenever you come across any job failing, you'll be able to see the logs on the console. It will help you move forward.


## Conclusion

Here we are! We took an extra step in our tech journey. In modern software development, CICD is an essential factor to be considered. So that I'm hoping this guideline makes sense to everyone.