import { Injectable } from "@nestjs/common";
import { Product } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateProductRequest } from "./dto/create-product.request";
import { UpdateProductRequest } from "./dto/update-product.request";
import { IProductRepository } from "./product-repository.interface";

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateProductRequest): Promise<Product> {
    const {
      brand,
      description,
      expiresAt,
      heightCm,
      lengthCm,
      manufacturedAt,
      name,
      price,
      productCategories,
      productTags,
      productType,
      sku,
      stock,
      weightKg,
      widthCm,
      isAvailable,
      businessId,
      slug,
    } = createRequest;

    const categoriesConnectOrCreate = this.makeConnectOrCreate(
      productCategories,
      "category",
      "name",
    );

    const tagsConnectOrCreate = this.makeConnectOrCreate(
      productTags,
      "tag",
      "name",
    );

    const created = await this.db.product.create({
      data: {
        brand,
        description,
        expiresAt,
        heightCm,
        lengthCm,
        manufacturedAt,
        name,
        price,
        sku,
        stock,
        weightKg,
        widthCm,
        isAvailable,
        productCategories: {
          create: categoriesConnectOrCreate as any,
        },
        productTags: {
          create: tagsConnectOrCreate as any,
        },
        productType: {
          connect: {
            type: productType,
          },
        },
        business: {
          connect: {
            id: businessId,
          },
        },
      },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        productTags: {
          include: {
            tag: true,
          },
        },
        productType: true,
      },
    });

    return created;
  }

  async findMany(paginationQuery: PaginationQuery): Promise<Product[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Product[] = await this.db.product.findMany({
      take,
      skip,
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        productTags: {
          include: {
            tag: true,
          },
        },
        productType: true,
      },
    });

    return list;
  }

  async findManyFromOwner(
    businessId: number,
    paginationQuery: PaginationQuery,
  ): Promise<Product[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Product[] = await this.db.product.findMany({
      take,
      skip,
      where: {
        businessId,
      },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        productTags: {
          include: {
            tag: true,
          },
        },
        productType: true,
      },
    });

    return list;
  }

  async findById(id: number): Promise<Product> {
    const item: Product = await this.db.product.findFirst({
      where: { id },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        productTags: {
          include: {
            tag: true,
          },
        },
        productType: true,
      },
    });
    return item;
  }

  async findByOwnerId(businessId: number): Promise<Product> {
    const item: Product = await this.db.product.findFirst({
      where: { businessId },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        productTags: {
          include: {
            tag: true,
          },
        },
        productType: true,
      },
    });
    return item;
  }

  async update(id: number, updateReq: UpdateProductRequest): Promise<Product> {
    const {
      brand,
      description,
      expiresAt,
      heightCm,
      lengthCm,
      manufacturedAt,
      name,
      price,
      productCategories,
      productTags,
      productType,
      sku,
      stock,
      weightKg,
      widthCm,
      isAvailable,
      businessId,
      slug,
    } = updateReq;

    const categoriesConnectOrCreate = this.makeConnectOrCreate(
      productCategories,
      "category",
      "name",
    );

    const tagsConnectOrCreate = this.makeConnectOrCreate(
      productTags,
      "tag",
      "name",
    );

    return await this.db.product.update({
      where: {
        id,
      },
      data: {
        brand,
        description,
        expiresAt,
        heightCm,
        lengthCm,
        manufacturedAt,
        name,
        price,
        sku,
        stock,
        weightKg,
        widthCm,
        isAvailable,
        productCategories: {
          create: categoriesConnectOrCreate as any,
        },
        productTags: {
          create: tagsConnectOrCreate as any,
        },
        productType: {
          connect: {
            type: productType,
          },
        },
        business: {
          connect: {
            id: businessId,
          },
        },
      },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        productTags: {
          include: {
            tag: true,
          },
        },
        productType: true,
      },
    });
  }

  async remove(id: number): Promise<Product> {
    const removed = await this.db.product.delete({
      where: { id },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        productTags: {
          include: {
            tag: true,
          },
        },
        productType: true,
      },
    });
    return removed;
  }

  async countAll(): Promise<number> {
    return await this.db.product.count();
  }

  makeConnectOrCreate(
    stringArray: string[],
    resourceKeyName: string,
    connectKeyName: string,
  ) {
    return stringArray.map((value) => {
      return {
        [`${resourceKeyName}`]: {
          connectOrCreate: {
            where: { [`${connectKeyName}`]: value },
            create: { [`${connectKeyName}`]: value },
          },
        },
      };
    });
  }
}
