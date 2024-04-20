## KUBERNETES COMMANDS

### Apply

Apply a configuration to a resource by filename

```bash
	kubectl apply -f <filename>
```

### Get

Get a resource by type and name

```bash
	kubectl get <resource_type> <resource_name>
```

### Describe

Show details of a specific resource or group of resources

```bash
	kubectl describe <resource_type> <resource_name>
```

### Logs

Print the logs for a container in a pod

```bash
	kubectl logs <pod_name> <container_name>
```

### Exec

Execute a command in a container

```bash
	kubectl exec <pod_name> <container_name> -- <command>
```

### Delete

Delete a resource by filename, stdin, resource and name, or by resources and label selector

```bash
	kubectl delete -f <filename>
	kubectl delete -f <directory>
	kubectl delete <resource_type> <resource_name>
	kubectl delete <resource_type> <resource_name> --grace-period=0 --force
	kubectl delete <resource_type> <resource_name> -l <label_key>=<label_value>
```

### Restart a deployment

Restart a deployment

```bash
	kubectl rollout restart deployment <deployment_name>
```


