# Spinning Up AWS EKS Nodes with Custom Kubelet Settings

## Problem

My application generates a large volume of logs written to `stdout`. However, I noticed missing log entries when analyzing them in Kibana.

### Root Cause

1. By default, the `stdout` and `stderr` output from Kubernetes pods is stored on the host node in the `/var/log/pods/` directory.
2. Kubernetes rotates these log files when they reach 10MB:
   - The original `0.log` file is renamed to `0.log.<timestamp>`.
   - The older `0.log.<timestamp>` files are compressed into `0.log.<timestamp>.gz`.
3. Fluent Bit (used as a log collector) reads only the active `0.log` file via a symlink. 

When logs are generated rapidly (>3MB per second), Fluent Bit may not process them completely before rotation occurs. This results in missing logs in the analytical interface, such as Kibana.

## Solution

### Understanding the Logging Pipeline

- **Default Runtime**: EKS uses ContainerD as the default container runtime.
- **Managed by Kubelet**: The `kubelet` is responsible for configuring ContainerD behavior, including log management.
- **Customization Options**: You can adjust the kubelet’s log rotation settings via `kubelet-config.json` or launch arguments.

### Customizing Kubelet Settings

To resolve the issue, you can increase the maximum log file size by customizing kubelet arguments. For EKS, this is achieved by creating an AWS Launch Template with customized User Data.

### Step-by-Step Implementation with Terraform


### Use a template file for generating the user data:

```hcl
data "template_file" "launch_template_userdata" {
  template = file("templates/userdata.sh.tpl")
}
```

### User Data Template

```bash
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="//"

--//
Content-Type: text/x-shellscript; charset="us-ascii"

#!/bin/bash
echo "Start of UserData"
set -ex
/etc/eks/bootstrap.sh ccp-k8s-sandbox \
    --kubelet-extra-args '--max-log-size=100M'

echo "End of UserData"

--//--

```

### Define the launch template in Terraform:
```hcl
resource "aws_launch_template" "worker" {
  for_each = toset(var.launch_template_names["custom-kubelet-settings"])
  key_name = var.key_name
  
  network_interfaces {
    security_groups = ["sg1", "sg2"]
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 2
  }

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size = var.volume_size
    }
  }

  user_data = base64encode(
    data.template_file.launch_template_userdata.rendered,
  )

  tag_specifications {
    resource_type = "instance"
    tags = merge(local.cluster_resource_tags, { extraTag = "example" })
  }

  tag_specifications {
    resource_type = "volume"
    tags = merge(local.cluster_resource_tags, { extraTag = "example" })
  }

  tags = merge(local.cluster_resource_tags, { extraTag = "example" })

  lifecycle {
    create_before_destroy = true
  }
}

```

### After deploying the EKS node, monitor the bootstrap process by checking the logs:
```bash
cat /var/log/cloud-init-output.log

```


## Conclusion

By customizing kubelet settings via an AWS Launch Template, you can resolve log rotation issues in EKS, ensuring that Fluent Bit processes all logs effectively and no data is lost in Kibana.
