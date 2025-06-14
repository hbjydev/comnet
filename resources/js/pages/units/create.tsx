import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input, InputDescription } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
    {
        title: 'Create',
        href: '/units/create',
    },
];

type NewUnitForm = {
    display_name: string;
    slug: string;
    description?: string;
    avatar?: File;
    banner?: File;
};

const slugify = (str: string) => {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
};

export default function Show() {
    const [slugChanged, setSlugChanged] = useState(false);
    const { data, setData, post, processing, errors } = useForm<Required<NewUnitForm>>({
        display_name: '',
        slug: '',
        description: '',
        avatar: new File([], 'blank.png'),
        banner: new File([], 'blank.png'),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('units.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a unit" />

            <div className="mx-auto flex max-w-screen-md flex-col gap-y-4 p-4">
                <Heading title="Create a new unit" description="Become the unit leader your mother never wanted you to be." />

                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="avatar">Avatar</Label>
                            <Input
                                id="avatar"
                                type="file"
                                onChange={(e) => {
                                    setData('avatar', e.target.files![0]);
                                }}
                                disabled={processing}
                            />
                            <InputError message={errors.avatar} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="banner">Banner</Label>
                            <Input
                                id="banner"
                                type="file"
                                onChange={(e) => {
                                    setData('banner', e.target.files![0]);
                                }}
                                disabled={processing}
                            />
                            <InputError message={errors.banner} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="display_name">Unit name</Label>
                            <Input
                                id="display_name"
                                type="text"
                                required
                                autoFocus
                                value={data.display_name}
                                onChange={(e) => {
                                    setData('display_name', e.target.value);
                                    if (!slugChanged) setData('slug', slugify(e.target.value));
                                }}
                                disabled={processing}
                                placeholder="PMC Alleyoop"
                            />
                            <InputError message={errors.display_name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                type="text"
                                required
                                value={data.slug}
                                onChange={(e) => {
                                    setData('slug', e.target.value);
                                    setSlugChanged(true);
                                }}
                                disabled={processing}
                                placeholder="pmcalleyoop"
                            />
                            <InputDescription>
                                Your unit's homepage will be available at{' '}
                                <span>
                                    /users/<span className="font-bold">{data.slug}</span>
                                </span>
                            </InputDescription>
                            <InputError message={errors.slug} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (optional)</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                disabled={processing}
                                placeholder="We are a milsim unit specialising in..."
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <Button type="submit" className="mt-2 w-full" tabIndex={6} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create account
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
