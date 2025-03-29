import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createProject } from "@/lib/firebase/firestore";
import { toast } from "sonner";
import { Dispatch, SetStateAction, useState } from "react";
import { IProject } from "@/app/types";

interface IProps {
  setAllProjects: Dispatch<SetStateAction<IProject[]>>;
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  latitude: z.string().min(1),
  longitude: z.string().min(1),
});

export default function AddProjectForm({ setAllProjects }: IProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      latitude: "",
      longitude: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    const data = {
      title: values.title,
      location: values.location,
      numberOfOrders: 2,
      lastOrderDate: "20/03/2025",
      imageCount: 15,
      videoCount: 1,
      panoCount: 2,
      coordinates: [Number(values.latitude), Number(values.longitude)],
    };

    try {
      const result: IProject = await createProject(data);
      setAllProjects((prev) => [...prev, result]);
      toast.success("Project created successfully.");
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add the project.");
      console.log("Failed to add the project: ", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription>
            Create a new project here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Title</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="SkyLens Chronicles" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 text-center" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Location</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="Mumbai, Maharashtra" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 text-center" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Longitude</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="72.8777" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 text-center" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Latitude</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="19.076" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 text-center" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="ml-auto block w-1/2"
              loader={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
